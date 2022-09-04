import { MockedProvider } from "@apollo/react-testing";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SingleSelectComponent from "../common/SelectBox/SingleSelect/SingleSelectComponent";

// const { mocks } = buildMocks();
const resourceTypeOptions = [
    { 'id': "1", 'value': 'Info Sheets' },
    { 'id': "2", 'value': 'Work Sheets' },
    { 'id': "3", 'value': 'Audio File' },
    { 'id': "4", 'value': 'Video File' }
];

const sut = async () => {
    render(
        <SingleSelectComponent
            fullWidth={true}
            id="testSelect"
            labelId='labelId'
            name='Test Select box'
            value="3"
            label='Suggested Test Selectbox'
            // onChange={set2}
            inputProps={{ "data-testid": "selectBoxTest" }}
            options={resourceTypeOptions}
            mappingKeys={["id", "value"]}
        />
    );
};

describe("test select dropdown", () => {
    it("should create upload button in screen", async () => {
        await sut();
        expect(screen.getByTestId("selectBoxTest")).toBeInTheDocument();
    });
});