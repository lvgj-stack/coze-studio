/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import * as base from './namespaces/base';
import * as keyword_search from './namespaces/keyword_search';
import * as memory from './namespaces/memory';
import * as storage from './namespaces/storage';
import * as time_capsule from './namespaces/time_capsule';
import * as user_behavior from './namespaces/user_behavior';
import * as vector_search from './namespaces/vector_search';

export {
  base,
  keyword_search,
  memory,
  storage,
  time_capsule,
  user_behavior,
  vector_search,
};
export * from './namespaces/base';
export * from './namespaces/keyword_search';
export * from './namespaces/memory';
export * from './namespaces/storage';
export * from './namespaces/time_capsule';
export * from './namespaces/user_behavior';
export * from './namespaces/vector_search';

export type Int64 = string | number;

export default class XmemoryApiService<T> {
  private request: any = () => {
    throw new Error('XmemoryApiService.request is undefined');
  };
  private baseURL: string | ((path: string) => string) = '';

  constructor(options?: {
    baseURL?: string | ((path: string) => string);
    request?<R>(
      params: {
        url: string;
        method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
        data?: any;
        params?: any;
        headers?: any;
      },
      options?: T,
    ): Promise<R>;
  }) {
    this.request = options?.request || this.request;
    this.baseURL = options?.baseURL || '';
  }

  private genBaseURL(path: string) {
    return typeof this.baseURL === 'string'
      ? this.baseURL + path
      : this.baseURL(path);
  }

  /**
   * POST /api/xmemory/time-capsule-clear-items
   *
   * 清空特定类型的数据
   */
  TimeCapsuleClearItems(
    req: time_capsule.TimeCapsuleClearItemsRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleClearItemsResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-clear-items');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      event_ms: _req['event_ms'],
      ext: _req['ext'],
      item_type: _req['item_type'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/citation-rank
   *
   * 记忆引用
   */
  CitationRank(
    req: time_capsule.CitationRankingRequest,
    options?: T,
  ): Promise<time_capsule.CitationRankingResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/citation-rank');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      llm_answer: _req['llm_answer'],
      search_results: _req['search_results'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-delete-items
   *
   * 删除items
   */
  TimeCapsuleDeleteItems(
    req: time_capsule.TimeCapsuleDeleteItemsRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleDeleteItemsResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-delete-items');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      item_type: _req['item_type'],
      iids: _req['iids'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-update-item
   *
   * 修改item
   */
  TimeCapsuleUpdateItem(
    req: time_capsule.TimeCapsuleUpdateItemRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleUpdateItemResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-update-item');
    const method = 'POST';
    const data = {
      iid: _req['iid'],
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      item_type: _req['item_type'],
      biz_id: _req['biz_id'],
      text: _req['text'],
      event_ms: _req['event_ms'],
      update_ms: _req['update_ms'],
      ext: _req['ext'],
      tags: _req['tags'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-search
   *
   * 根据用户的原始query进行搜索，针对LTM场景进行能力封装
   *
   * 提供：
   *
   * 1.Context Dump能力，支持还原调用现场。
   *
   * 2.实时生成精华记忆能力。
   *
   * 3.基础的Search能力，召回Items。
   */
  TimeCapsuleSearch(
    req: time_capsule.TimeCapsuleSearchRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleSearchResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-search');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      search_item: _req['search_item'],
      max_length: _req['max_length'],
      skip_block: _req['skip_block'],
      message_id: _req['message_id'],
      conversation_id: _req['conversation_id'],
      section_id: _req['section_id'],
      chat_context: _req['chat_context'],
      ref_bot_id: _req['ref_bot_id'],
      ext: _req['ext'],
      strategy_bundle: _req['strategy_bundle'],
      x_api_forward: _req['x_api_forward'],
      Base: _req['Base'],
    };
    return this.request({ url, method, data }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-list-items
   *
   * 入口：coze平台上，右上角“长期记忆”
   *
   * 搜索具体时间范围内的历史聊天记录
   */
  TimeCapsuleListItems(
    req: time_capsule.TimeCapsuleListItemsRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleListItemsResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-list-items');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      time_capsule_item_type: _req['time_capsule_item_type'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      start_event_ms: _req['start_event_ms'],
      end_event_ms: _req['end_event_ms'],
      offset: _req['offset'],
      limit: _req['limit'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-add-item
   *
   * 添加item
   */
  TimeCapsuleAddItem(
    req: time_capsule.TimeCapsuleAddItemRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleAddItemResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-add-item');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      item_type: _req['item_type'],
      biz_id: _req['biz_id'],
      text: _req['text'],
      event_ms: _req['event_ms'],
      update_ms: _req['update_ms'],
      ext: _req['ext'],
      tags: _req['tags'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-clear-all-items
   *
   * 清空所有类型的数据
   */
  TimeCapsuleClearAllItems(
    req: time_capsule.TimeCapsuleClearAllItemsRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleClearAllItemsResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-clear-all-items');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      event_ms: _req['event_ms'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }

  /**
   * POST /api/xmemory/time-capsule-search-items
   *
   * 根据用户的原始query进行搜索，仅提供基础的Search能力，召回Items。
   */
  TimeCapsuleSearchItems(
    req: time_capsule.TimeCapsuleSearchItemsRequest,
    options?: T,
  ): Promise<time_capsule.TimeCapsuleSearchItemsResponse> {
    const _req = req;
    const url = this.genBaseURL('/api/xmemory/time-capsule-search-items');
    const method = 'POST';
    const data = {
      bot_id: _req['bot_id'],
      connector_uid: _req['connector_uid'],
      connector_id: _req['connector_id'],
      search_item: _req['search_item'],
      max_length: _req['max_length'],
      ref_bot_id: _req['ref_bot_id'],
      ext: _req['ext'],
      search_strategy: _req['search_strategy'],
      Base: _req['Base'],
    };
    const headers = { 'X-Api-Forward': _req['X-Api-Forward'] };
    return this.request({ url, method, data, headers }, options);
  }
}
/* eslint-enable */
