import React from 'react';
import { Button } from '@material-ui/core';
import NetworkTestWidget from './NetworkTestWidget';
import RegionResult from './RegionResult/RegionResult';
import { shallow } from 'enzyme';
import useTestRunner from './useTestRunner/useTestRunner';

jest.mock('./useTestRunner/useTestRunner');
const mockUseTestRunner = useTestRunner as jest.Mock<any>;

jest.mock('../constants', () => ({
  DEFAULT_CODEC_PREFERENCES: ['opus'],
  DEFAULT_REGIONS: ['ashburn', 'dublin', 'roaming'],
}));

describe('the NetworkTestWidget component', () => {
  it('should not render RegionResult components when there are no results', () => {
    mockUseTestRunner.mockImplementation(() => ({
      isRunning: false,
      results: [],
      activeRegion: undefined,
      activeTest: undefined,
      runTests: jest.fn(),
    }));

    const wrapper = shallow(
      <NetworkTestWidget
        getTURNCredentials={(() => {}) as any}
        getVoiceToken={(() => {}) as any}
        onComplete={() => {}}
      />
    );

    expect(wrapper.find(RegionResult).exists()).toBe(false);
    expect(wrapper.find(Button).find({ disabled: false }).length).toBe(2);
  });

  it('should correctly render RegionResult components while tests are active', () => {
    mockUseTestRunner.mockImplementation(() => ({
      isRunning: true,
      results: [],
      activeRegion: 'ashburn',
      activeTest: 'bitrate',
      runTests: jest.fn(),
    }));

    const wrapper = shallow(
      <NetworkTestWidget
        getTURNCredentials={(() => {}) as any}
        getVoiceToken={(() => {}) as any}
        onComplete={() => {}}
      />
    );

    expect(wrapper.find(RegionResult).find({ region: 'ashburn' }).props()).toEqual({
      activeTest: 'bitrate',
      isActive: true,
      region: 'ashburn',
      result: undefined,
    });
    expect(wrapper.find(Button).find({ disabled: true }).length).toBe(2);
  });

  it('should correctly render RegionResult components when there are results', () => {
    mockUseTestRunner.mockImplementation(() => ({
      isRunning: false,
      results: ['mockResults'],
      activeRegion: undefined,
      activeTest: undefined,
      runTests: jest.fn(),
    }));

    const wrapper = shallow(
      <NetworkTestWidget
        getTURNCredentials={(() => {}) as any}
        getVoiceToken={(() => {}) as any}
        onComplete={() => {}}
      />
    );

    expect(wrapper.find(RegionResult).at(0).props()).toEqual({
      activeTest: undefined,
      isActive: false,
      region: 'ashburn',
      result: 'mockResults',
    });
  });

  it('should call the onComplete function with the results when the tests are complete', () => {
    mockUseTestRunner.mockImplementation(() => ({
      isRunning: false,
      results: [],
      activeRegion: undefined,
      activeTest: undefined,
      runTests: jest.fn(() => Promise.resolve('mockResults')),
    }));

    const mockOnComplete = jest.fn();

    const wrapper = shallow(
      <NetworkTestWidget
        getTURNCredentials={(() => {}) as any}
        getVoiceToken={(() => {}) as any}
        onComplete={mockOnComplete}
      />
    );

    wrapper.find(Button).at(0).simulate('click');

    setImmediate(() => expect(mockOnComplete).toHaveBeenCalledWith('mockResults'));
  });
});
