import { Button } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useLazyQuery } from '@apollo/client';
import { GET_UPLOAD_RESOURCE_URL } from '../../../graphql/query/resource';
import { getUpdatedFileName } from '../../../lib/helpers/s3';

type propsType = {
    variant?: "contained" | "text" | "outlined";
    name: string;
    accept?: "image/*" | "*";
    multiple?: boolean;
    onChange: any;
    inputProps?: any;
    extraProps?: any;
}

export default function UploadButtonComponent(props: propsType) {

    const [
        getPreSignedURL
    ] = useLazyQuery(GET_UPLOAD_RESOURCE_URL);

    

    const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        const { fileName } = getUpdatedFileName(event.target.files[0]);
        try {
            const {data: preSignedData}: any = await getPreSignedURL({
                variables: { fileName: fileName },
            });
            if (preSignedData && preSignedData?.getUploadResourceUrl && preSignedData?.getUploadResourceUrl.resource_upload) {
                props.onChange(fileObj, fileName, preSignedData.getUploadResourceUrl.resource_upload);
            }
        } catch (error) {
            
        }
    };

    return (
        <Button variant={props.variant} component="label" startIcon={<SendIcon />}>
            Upload
            <input hidden 
                name={props.name} 
                accept={props.accept} 
                multiple={props.multiple} 
                onChange={fileOnChange} 
                { ...props.extraProps }
                type="file" />
        </Button>
    )
}
