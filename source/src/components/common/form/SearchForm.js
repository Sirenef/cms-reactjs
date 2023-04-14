import { FieldTypes } from '@constants/formConfig';
import { Button, Col, Form, Row } from 'antd';
import React, { useCallback, useEffect } from 'react';
import SelectField from './SelectField';
import DatePickerField from './DatePickerField';
import DateRangePickerField from './DateRangePickerField';
import InputTextField from './InputTextField';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { defineMessages, useIntl } from 'react-intl';

import styles from './SearchForm.module.scss';

const searchFields = {
    [FieldTypes.SELECT]: SelectField,
    [FieldTypes.DATE]: DatePickerField,
    [FieldTypes.DATE_RANGE]: DateRangePickerField,
    default: InputTextField,
};

const message = defineMessages({
    search: 'Search',
    clear: 'Clear',
});

function SearchForm({ fields = [], hiddenAction, onSearch, className, onReset, initialValues }) {
    const [ form ] = Form.useForm();
    const intl = useIntl();
    let valueBack="";
    const handleSearchSubmit = useCallback(
        (values) => {
            valueBack=values;
            onSearch?.(values);
        },
        [ form, onSearch ],
    );

    const handleClearSearch = () => {
        form.resetFields();
        onReset?.();
    };

    const renderField = useCallback(
        ({ type, submitOnChanged, onChange, key, renderItem, ...props }) => {
            if (renderItem) {
                return (
                    <Form.Item {...props} name={key} style={{ marginBottom: '0px' }}>
                        {renderItem()}
                    </Form.Item>
                );
            }

            const Field = searchFields[type] || searchFields.default;
            return <Field {...props} name={key} onChange={submitOnChanged ? handleSearchSubmit : onChange} />;
        },
        [ handleSearchSubmit ],
    );

    useEffect(() => {
        form.setFieldsValue(valueBack);
    }, [ initialValues ]);

    return (
        <Form form={form} layout="horizontal" className={className || styles.searchForm} onFinish={handleSearchSubmit}>
            <Row gutter={10} >
                {fields.map((field) => {
                    const { key, colSpan, className, ...props } = field;
                    return (
                        <Col key={key} span={(colSpan || 1) * 3} className={className}>
                            {renderField({ ...props, key })}
                        </Col>
                    );
                })}
                {!hiddenAction && fields.length > 0 && (
                    <Col>
                        <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                            {intl.formatMessage(message.search)}
                        </Button>
                        <Button style={{ marginLeft: 8 }} icon={<ClearOutlined />} onClick={handleClearSearch}>
                            {intl.formatMessage(message.clear)}
                        </Button>
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default SearchForm;
