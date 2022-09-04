import React, { useEffect, useState } from 'react'
import AddForm from '../../../../components/admin/resource/addForm'
import ContentHeader from '../../../../components/common/ContentHeader'
import Layout from '../../../../components/layout'
import { buildAdminTokenValidationQuery } from '../../../../lib/helpers/auth';

export default function index() {
    const [adminId, setadminId] = useState<string>("");
    const [gettokenData, tokenLoading, tokenData] = buildAdminTokenValidationQuery(
        (userId) => {
            setadminId(userId);
        }
    );

    useEffect(() => {
        gettokenData();
    }, []);

    return (
        <>
            <Layout>
                <ContentHeader title="Add Resource" />
                <AddForm />
            </Layout>
        </>
    )
}
