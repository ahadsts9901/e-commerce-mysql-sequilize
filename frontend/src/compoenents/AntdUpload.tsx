import { useState, forwardRef, useImperativeHandle } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType, setImageUrl: (url: string) => void, setFile: (file: FileType) => void) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
    }
    setFile(file);
    getBase64(file, setImageUrl);
    return false; // Prevent upload
};

interface AntdUploadProps {
    setFile: (file: FileType) => void;
}

const AntdUpload = forwardRef<unknown, AntdUploadProps>(({ setFile }, ref) => {
    const [imageUrl, setImageUrl] = useState<string>();

    useImperativeHandle(ref, () => ({
        reset: () => {
            setImageUrl(undefined);
        }
    }));

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file) => beforeUpload(file, setImageUrl, setFile)}
                accept='image/*'
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    );
});

export default AntdUpload;