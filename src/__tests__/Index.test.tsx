import { render } from '@testing-library/react';
import Index from '../pages/index';

describe("Index page", () => {
    it("should render", () => {
        render(<Index />);
    });
});