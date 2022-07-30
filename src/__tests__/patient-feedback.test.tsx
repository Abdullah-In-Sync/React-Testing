import { render } from '@testing-library/react';
import Feedback from '../pages/patient/feedback';

describe('Checks the Patient Safety plan page', () => {
    it("should render", () => {
        render(<Feedback />);
    });
})