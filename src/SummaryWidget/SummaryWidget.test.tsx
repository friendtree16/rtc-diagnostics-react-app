import React from 'react';
import SummaryWidget from './SummaryWidget';
import { shallow } from 'enzyme';

const results = [
  {
    edge: 'ashburn',
    results: {
      preflight: {
        callQuality: 'Good',
        stats: {
          mos: {
            average: 4,
          },
        },
      },
    },
  },
  {
    edge: 'dublin',
    results: {
      preflight: {
        callQuality: 'Great',
        stats: {
          mos: {
            average: 5,
          },
        },
      },
    },
  },
];

describe('the SummaryWidget component', () => {
  it('should choose the edge with the highest mos score and display it', () => {
    const wrapper = shallow(<SummaryWidget results={results as any} />);
    expect(wrapper.at(0).text()).toBe('Expected Call Quality: Great (5)Recommended Edge Location: Dublin');
  });

  it('should not render when "results" is undefined', () => {
    const wrapper = shallow(<SummaryWidget results={undefined} />);
    expect(wrapper.get(0)).toBe(null);
  });

  it('should not render when the "results" array has no results', () => {
    const wrapper = shallow(<SummaryWidget results={[{ results: {} }, { results: {} }] as any} />);
    expect(wrapper.get(0)).toBe(null);
  });
});
