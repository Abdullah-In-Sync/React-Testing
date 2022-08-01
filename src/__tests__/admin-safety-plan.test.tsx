import { render } from '@testing-library/react';
import SafetyPlan from '../pages/admin/safety-plan';

describe('Checks the Admin Safety plan page', () => {
    it("should render", () => {
        render(<SafetyPlan />);
    });
})