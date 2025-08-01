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

import type { ReactNode } from 'react';

import { RadioGroup } from '@coze-arch/coze-design';
import type { RadioGroupProps } from '@coze-arch/coze-design';

import styles from './index.module.less';

export interface KnowledgeSourceRadioGroupProps {
  value: RadioGroupProps['value'];
  onChange: RadioGroupProps['onChange'];
  children: ReactNode;
}

export const KnowledgeSourceRadioGroup = (
  props: KnowledgeSourceRadioGroupProps,
) => {
  const { value, onChange, children } = props;

  return (
    <div className={styles['radio-wrapper']}>
      <RadioGroup
        type="pureCard"
        onChange={onChange}
        value={value}
        direction="horizontal"
        name="format-type"
        className={styles['radio-group']}
      >
        {children}
      </RadioGroup>
    </div>
  );
};
