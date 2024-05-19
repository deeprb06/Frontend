/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import commonApi from 'api';
import DeleteIcon from 'icons/deleteIcon';
import DownloadIcon from 'icons/downloadIcon';
import UploadIcon from 'icons/uploadIcon';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Toast from 'utils/toast';
import Loader from 'widgets/loader';

const FileUpload = ({
    label = '',
    value,
    setValue = () => {},
    keyName = 'image',
    resolution = false,
    mandatory,
    error,
    mimeType,
    size,
    disabled = false,
}) => {
    const [loading, setLoading] = useState(false);
    const fileSize =
        size && size > 1024 ? `${(size / 1024).toFixed(1)} MB` : `${size} KB`;
    const types = mimeType
        ?.map((mime) => mime?.name?.toUpperCase())
        ?.join(', ');

    const { getRootProps, getInputProps } = useDropzone({
        accept: mimeType?.map((m) => m?.desc),
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length === 0) {
                return Toast(`You can upload only ${types} file!`, 'error');
            }
            if (size && acceptedFiles[0].size / 1024 / 1024 / 1024 > size) {
                return Toast(
                    `File size must be smaller than ${fileSize} !`,
                    'error'
                );
            }
            const file = acceptedFiles[0]?.name;
            const payload = new FormData();
            payload.append('files', acceptedFiles[0], file);
            setLoading(true);
            commonApi({
                action: 'imgUpload',
                data: payload,
                config: {
                    contentType: 'multipart/form-data',
                },
            })
                .then(async ([, { data = {} }]) => {
                    setValue(`${keyName}`, data[0] || {}, {
                        shouldValidate: true,
                    });
                    return false;
                })
                .catch(() => {})
                .finally(() => setLoading(false));
            return true;
        },
    });

    const deleteFile = async () => {
        setValue(`${keyName}`, undefined, { shouldValidate: true });
    };

    const getIcon = (data) => {
        if (data.mimeType?.includes('image'))
            return (
                <div className="flex items-center justify-center h-24 overflow-hidden border border-gray rounded-md single-profile-add w-40">
                    <div className="relative flex items-center justify-center h-20 choose-img w-36">
                        <img
                            src={data.uri}
                            className="relative object-cover h-20 overflow-hidden rounded-md border border-gray-200 w-36"
                            alt="Logo"
                        />
                        {!disabled && (
                            <div className="absolute transition delete-icon focus:outline-none">
                                <DeleteIcon
                                    onClick={deleteFile}
                                    className="w-5 h-5 cursor-pointer text-red"
                                />
                            </div>
                        )}
                    </div>
                </div>
            );
        if (data.mimeType?.includes('video'))
            return (
                <div className="relative flex items-center justify-center border border-gray rounded-md w-72 my-2">
                    {!disabled && (
                        <div
                            className="absolute cursor-pointer z-10 -top-2 -right-2 text-red bg-white border border-gray w-6 h-6 flex justify-center items-center rounded-md"
                            onClick={deleteFile}
                        >
                            <DeleteIcon />
                        </div>
                    )}
                    <video
                        src={data.uri}
                        className="rounded-md border border-gray-200 w-full"
                        controls
                    />
                </div>
            );
        return (
            <div className="rounded-md border-2 flex justify-center items-center gap-3 font-medium text-gray-500 border-gray-200 w-fit text-sm my-2 p-4">
                {data.name}
                <a href={value.uri} target="_blank" rel="noreferrer">
                    <DownloadIcon
                        width="20"
                        height="20"
                        className="cursor-pointer"
                    />
                </a>
                {!disabled && (
                    <DeleteIcon
                        onClick={deleteFile}
                        className="cursor-pointer"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="col-span-3 relative mt-2">
            <div className="flex items-center gap-2 justify-between">
                {label && (
                    <label className="text-xs font-medium mb-2 inline-block text-foreground capitalize">
                        {label}{' '}
                        {mandatory ? <span className="text-red">*</span> : ''}
                    </label>
                )}
                {resolution && (
                    <span className="text-xs font-medium mb-2 inline-block text-red">
                        Size must be in {resolution}
                    </span>
                )}
            </div>
            <div
                {...getRootProps({ className: 'dropzone' })}
                className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-primary-border ${
                    disabled || loading
                        ? 'pointer-events-none !bg-disabled-gray'
                        : ''
                }`}
            >
                <div className="relative">
                    <Loader relative loading={loading} />
                    <input {...getInputProps()} disabled={loading} />
                    <div className="flex gap-4 text-center">
                        <div className="w-12 h-12 mx-auto">
                            <UploadIcon size="48" />
                        </div>
                        <div className="self-center text-left text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative gap-4 font-medium text-center rounded-md cursor-pointer text-blue focus-within:outline-none"
                            >
                                <span>
                                    Upload a file
                                    <p className="inline pl-1 text-gray-500">
                                        or drag and drop
                                    </p>
                                </span>
                            </label>
                            <p className="pt-1 text-xs text-gray-500">
                                {types} {size ? `up to ${fileSize}` : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <p className="mt-1 text-xs font-medium text-red">{error}</p>
            )}
            {value?.uri && <div className="mt-4">{getIcon(value)}</div>}
        </div>
    );
};

export default FileUpload;
