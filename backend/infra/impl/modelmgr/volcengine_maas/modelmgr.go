package volcengine_maas

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/coze-dev/coze-studio/backend/infra/contract/cache"
	"github.com/coze-dev/coze-studio/backend/infra/contract/modelmgr"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/sets"
	"github.com/coze-dev/coze-studio/backend/types/consts"
	"github.com/volcengine/volcengine-go-sdk/service/ark"
	"github.com/volcengine/volcengine-go-sdk/volcengine"
	"github.com/volcengine/volcengine-go-sdk/volcengine/credentials"
	"github.com/volcengine/volcengine-go-sdk/volcengine/session"
)

var _ modelmgr.Manager = (*volcModelManager)(nil)

type volcModelManager struct {
	models       []*modelmgr.Model
	modelMapping map[int64]*modelmgr.Model
	arkClient    *ark.ARK
	cacheCli     cache.Cmdable
}

func NewModelMgr(staticModels []*modelmgr.Model, cacheCli cache.Cmdable) (modelmgr.Manager, error) {

	cfg := volcengine.NewConfig().
		WithCredentials(credentials.NewStaticCredentials(os.Getenv(consts.VolcengineMAASAccessKey), os.Getenv(consts.VolcengineMAASSecretKey), "")).
		WithRegion(os.Getenv(consts.VolcengineMAASRegion))

	sess, err := session.NewSession(cfg)
	if err != nil {
		return nil, err
	}
	svc := ark.New(sess)

	mapping := make(map[int64]*modelmgr.Model, len(staticModels))
	for i := range staticModels {
		mapping[staticModels[i].ID] = staticModels[i]
	}

	manager := &volcModelManager{
		arkClient:    svc,
		cacheCli:     cacheCli,
		models:       staticModels,
		modelMapping: mapping,
	}
	manager.initModelList(context.Background())
	return manager, nil
}

func (v *volcModelManager) initModelList(ctx context.Context) error {
	newModels := make([]*modelmgr.Model, 0)
	for i := range v.models {
		m := v.models[i]
		item, err := v.listEndpoints(ctx, m.Name)
		if err != nil {
			continue
		}
		m.Meta.ConnConfig.Model = *item.Id
		m.Meta.ConnConfig.APIKey = os.Getenv(consts.VolcengineMAASAPIKey)
		newModels = append(newModels, m)
	}
	v.models = newModels
	mapping := make(map[int64]*modelmgr.Model, len(newModels))
	for i := range newModels {
		mapping[newModels[i].ID] = newModels[i]
	}
	v.modelMapping = mapping
	return nil
}

func (v *volcModelManager) listEndpoints(ctx context.Context, modelName string) (*ark.ItemForListEndpointsOutput, error) {
	m := strings.ReplaceAll(modelName, ".", "-")
	input := &ark.ListEndpointsInput{
		Filter: &ark.FilterForListEndpointsInput{
			FoundationModelName: volcengine.String(m),
		},
	}
	resp, err := v.arkClient.ListEndpointsWithContext(ctx, input)
	if err != nil {
		return nil, err
	}
	if len(resp.Items) == 0 {
		return nil, fmt.Errorf("model %s not found", modelName)
	}
	return resp.Items[0], nil
}

func (v *volcModelManager) ListModel(ctx context.Context, req *modelmgr.ListModelRequest) (*modelmgr.ListModelResponse, error) {
	startIdx := 0
	if req.Cursor != nil {
		start, err := strconv.ParseInt(*req.Cursor, 10, 64)
		if err != nil {
			return nil, err
		}
		startIdx = int(start)
	}

	limit := req.Limit
	if limit == 0 {
		limit = 100
	}

	var (
		i        int
		respList []*modelmgr.Model
		statSet  = sets.FromSlice(req.Status)
	)

	for i = startIdx; i < len(v.models) && len(respList) < limit; i++ {
		m := v.models[i]
		if req.FuzzyModelName != nil && !strings.Contains(m.Name, *req.FuzzyModelName) {
			continue
		}
		if len(statSet) > 0 && !statSet.Contains(m.Meta.Status) {
			continue
		}
		respList = append(respList, m)
	}

	resp := &modelmgr.ListModelResponse{
		ModelList: respList,
	}
	resp.HasMore = i != len(v.models)
	if resp.HasMore {
		resp.NextCursor = ptr.Of(strconv.FormatInt(int64(i), 10))
	}

	return resp, nil
}

func (v *volcModelManager) ListInUseModel(ctx context.Context, limit int, Cursor *string) (*modelmgr.ListModelResponse, error) {
	return v.ListModel(ctx, &modelmgr.ListModelRequest{
		Status: []modelmgr.ModelStatus{modelmgr.StatusInUse},
		Limit:  limit,
		Cursor: Cursor,
	})
}

func (v *volcModelManager) MGetModelByID(ctx context.Context, req *modelmgr.MGetModelRequest) ([]*modelmgr.Model, error) {
	resp := make([]*modelmgr.Model, 0)
	for _, id := range req.IDs {
		if m, found := v.modelMapping[id]; found {
			resp = append(resp, m)
		}
	}
	return resp, nil
}
