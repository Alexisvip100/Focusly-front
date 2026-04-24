import { gql } from '@apollo/client';

export const GET_INSIGHTS = gql`
  query GetInsights($userId: String!, $filter: String!) {
    insights: getInsights(userId: $userId, filter: $filter) {
      totalFocusHours {
        value
        change
        trend
      }
      taskCompletion {
        value
        change
        trend
      }
      energyScore {
        value
        change
        trend
      }
      goldenWindow {
        value
        change
        trend
      }
      breakHours {
        value
        change
        trend
      }
      productivityTrends {
        label
        actual
        planned
      }
      timeDistribution {
        name
        value
        color
      }
      heatmap
      heatmapLabels
    }
  }
`;
