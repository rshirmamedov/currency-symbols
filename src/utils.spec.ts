import { sleep } from './utils';

describe("utils", () => {
    it('calls with delay', (done) => {
        const callback = jest.fn();

        jest.useFakeTimers();

        sleep(3000, callback);

        jest.advanceTimersByTime(3000);

        expect(callback).toHaveBeenCalledTimes(1);
        done();
    });
});