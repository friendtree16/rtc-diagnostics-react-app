import { Edge, TestResults } from './types';

export const round = (num: number, decimals = 2) =>
  Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;

export function regionalizeIceUrls(edge: Edge, iceServers: RTCIceServer[]) {
  if (edge === 'roaming') {
    return iceServers;
  }

  return iceServers.map((server: RTCIceServer) => {
    const result = {
      ...server,
    };

    if (result.url) {
      result.url = result.url.replace('global', edge);
    }

    if (typeof result.urls === 'string') {
      result.urls = result.urls.replace('global', edge);
    }

    if (Array.isArray(result.urls)) {
      result.urls = result.urls.map((url) => url.replace('global', edge));
    }
    return result;
  });
}

export const edgeNameMap = {
  sydney: 'Sydney',
  'sao-paolo': 'Sao Paolo',
  dublin: 'Dublin',
  frankfurt: 'Frankfurt',
  tokyo: 'Tokyo',
  singapore: 'Singapore',
  ashburn: 'Ashburn',
  roaming: 'Roaming',
  'ashburn-ix': 'Ashburn IX',
  'san-jose-ix': 'San Jose IX',
  'london-ix': 'London IX',
  'frankfurt-ix': 'Frankfurt IX',
  'singapore-ix': 'Singapore IX',
};

export function getEdgeName(result: TestResults) {
  if (result.results.preflight?.selectedEdge === 'roaming') {
    return `Roaming (${edgeNameMap[result.results.preflight?.edge as Edge]})`;
  }

  return edgeNameMap[result.edge as Edge];
}
