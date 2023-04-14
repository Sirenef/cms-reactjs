import React from 'react';

import { Form, Checkbox } from 'antd';

import useFormField from '@hooks/useFormField';

function CheckboxField({
    label,
    name,
    required,
    labelAlign,
    optionLabel,
    onChange,
    formItemProps,
    fieldProps,
    checked,
    valueCheck,
    ...props
}) {
    const { rules } = useFormField(props);
    return (
        <Form.Item
            {...formItemProps}
            labelAlign={labelAlign}
            required={required}
            label={label}
            name={name}
            rules={rules}
            checked={checked}
            valuePropName="checked"
        >
            <Checkbox {...fieldProps} onChange={onChange} >
                {optionLabel}
            </Checkbox>
        </Form.Item>
    );
}

export default CheckboxField;
