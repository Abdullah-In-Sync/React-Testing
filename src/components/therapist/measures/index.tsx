import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import {
    GET_THERAPIST_MEASURES_LIST,
} from "../../../graphql/Measure/graphql";
import MeasureContent from "./MeasuresContent";

import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    TherapistMeasuresData,
} from "../../../graphql/Measure/types";

type ViewProps = {

}

const Measures: React.FC<ViewProps> = () => {
    const router = useRouter();
    const {
        query: { id },
    } = router;
    const patientId = id as string;
    const [getTherapistMeasuresList, {
        loading: loadingMeasuresList,
        data: { therapistListMeasures: listData = [] } = {},
    }] = useLazyQuery<TherapistMeasuresData>(GET_THERAPIST_MEASURES_LIST, {
        fetchPolicy: "cache-and-network",
        onCompleted: () => {

        },
    });

    useEffect(() => {
        getTherapistMeasuresList({
            variables: { patientId },
        });
    }, [])

    const handleCreateMeasure = () => {
        router.push("/measures/create")
    }

    const actionButtonClick = () => {

    }

    return (
        <MeasureContent listData={listData} onClickCreateMeasure={handleCreateMeasure} actionButtonClick={actionButtonClick} />
    );
};

export default Measures;
