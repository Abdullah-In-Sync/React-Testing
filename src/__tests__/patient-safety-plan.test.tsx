import { render } from '@testing-library/react';
import SafetyPlan from '../pages/patient/safety-plan';

describe('Checks the Patient Safety plan page', () => {
    it("should render", () => {
        render(<SafetyPlan />);
    });
})