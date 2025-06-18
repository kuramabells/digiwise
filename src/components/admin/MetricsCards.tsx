import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Assessment, CheckCircle, TrendingUp } from '@mui/icons-material';

interface MetricsCardsProps {
  stats: {
    totalAssessments: number;
    completedAssessments: number;
    completionRate: number;
  };
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ stats }) => {
  const { totalAssessments, completedAssessments, completionRate } = stats;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Total Assessments
                </Typography>
                <Typography variant="h4">
                  {totalAssessments?.toLocaleString() || 0}
                </Typography>
              </div>
              <Assessment className="text-blue-500" style={{ fontSize: 40 }} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Completed Assessments
                </Typography>
                <Typography variant="h4">
                  {completedAssessments?.toLocaleString() || 0}
                </Typography>
              </div>
              <CheckCircle className="text-green-500" style={{ fontSize: 40 }} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Completion Rate
                </Typography>
                <Typography variant="h4">
                  {completionRate?.toFixed(1) || 0}%
                </Typography>
              </div>
              <TrendingUp className="text-purple-500" style={{ fontSize: 40 }} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};