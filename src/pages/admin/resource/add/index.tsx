import React from 'react'
import AddForm from '../../../../components/admin/resource/addForm'
import ContentHeader from '../../../../components/common/ContentHeader'
import Layout from '../../../../components/layout'

export default function index() {
    return (
        <>
            <Layout>
                <ContentHeader title="Add Resource" />
                <AddForm />
            </Layout>
        </>
    )
}
