const apiList = {
    fileUpload: {
        url: () => 'api/v1/media/upload',
        method: 'POST',
    },
    permissionByRole: {
        url: (id) => `admin/permissions/by-role/${id}`,
        method: 'POST',
    },

    commonUrl: (module) => ({
        list: {
            url: () => `admin/${module}/list`,
            method: 'POST',
        },
        create: {
            url: () => `admin/${module}/create`,
            method: 'POST',
        },
        get: {
            url: (id) => `admin/${module}/${id}`,
            method: 'GET',
        },
        update: {
            url: (id) => `admin/${module}/update/${id}`,
            method: 'PUT',
        },
        partialUpdate: {
            url: (id) => `admin/${module}/partial/${id}`,
            method: 'PATCH',
        },
    }),
};
