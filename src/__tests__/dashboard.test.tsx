import { render } from '@testing-library/react';
import Dashboard from '../pages/dashboard';

describe('Checks the Dashboard page', () => {
    it("should render", () => {
        render(<Dashboard />);
    });
})