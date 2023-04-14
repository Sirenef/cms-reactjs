import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_PENDING } from '@constants';
import { defineMessage } from 'react-intl';


const commonMessage = defineMessage({
    status: {
        active: {
            id: 'constants.masterData.commonMessage.status.active',
            defaultMessage: 'Active',
        },
        pending: {
            id: 'constants.masterData.commonMessage.status.pending',
            defaultMessage: 'Pending',
        },
        inactive: {
            id: 'constants.masterData.commonMessage.status.inactive',
            defaultMessage: 'Inactive',
        },
    },
});

export const languageOptions = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'VN' },
    { value: 3, label: 'Other' },
];

export const orderOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    { value: STATUS_PENDING, label: 'Pending', color: 'warning' },
    { value: STATUS_INACTIVE, label: 'Inactive', color: 'red' },
];

export const statusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.status.active, color: '#00A648' },
    { value: STATUS_PENDING, label: commonMessage.status.pending, color: '#FFBF00' },
    { value: STATUS_INACTIVE, label: commonMessage.status.inactive, color: '#CC0000' },
];
