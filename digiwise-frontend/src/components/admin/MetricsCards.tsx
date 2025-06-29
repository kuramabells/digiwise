import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { TrendingUp, People, PersonAdd, Assessment as AssessmentIcon } from '@mui/icons-material';

interface MetricsCardsProps {
  stats: {
    userMetrics?: {
      totalUsers: number;
      usersWithAssessments: number;
      recentUsers: number;
      assessmentParticipation: number;
    };
    assessmentMetrics: {
      totalAssessments: number;
      completedAssessments: number;
      completionRate: number;
    };
    riskDistribution?: {
      low: number;
      moderate: number;
      high: number;
      severe: number;
    };
  };
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ stats }) => {
  // Set default values for all metrics
  const defaultUserMetrics = {
    totalUsers: 0,
    usersWithAssessments: 0,
    recentUsers: 0,
    assessmentParticipation: 0
  };

  const defaultAssessmentMetrics = {
    totalAssessments: 0,
    completedAssessments: 0,
    completionRate: 0
  };

  const defaultRiskDistribution = {
    low: 0,
    moderate: 0,
    high: 0,
    severe: 0
  };

  // Destructure with defaults
  const { 
    userMetrics = defaultUserMetrics, 
    assessmentMetrics = defaultAssessmentMetrics,
    riskDistribution = defaultRiskDistribution
  } = stats || {};
  
  // Destructure user metrics
  const { 
    totalUsers, 
    usersWithAssessments, 
    recentUsers, 
    assessmentParticipation 
  } = userMetrics;
  
  // Destructure assessment metrics
  const { 
    totalAssessments, 
    completedAssessments, 
    completionRate 
  } = assessmentMetrics;

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="text-gray-600">User Metrics</Typography>
      <Grid container spacing={3} component="div">
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3} component="div">
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">
                    {totalUsers?.toLocaleString() || 0}
                  </Typography>
                </div>
                <People className="text-blue-500" style={{ fontSize: 40 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Users (Last 30 days) */}
        <Grid item xs={12} sm={6} md={3} component="div">
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    New Users (30d)
                  </Typography>
                  <Typography variant="h4">
                    {recentUsers?.toLocaleString() || 0}
                  </Typography>
                </div>
                <PersonAdd className="text-green-500" style={{ fontSize: 40 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Users with Assessments */}
        <Grid item xs={12} sm={6} md={3} component="div">
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Active Users
                  </Typography>
                  <Typography variant="h4">
                    {usersWithAssessments?.toLocaleString() || 0}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {assessmentParticipation.toFixed(1)}% participation
                  </Typography>
                </div>
                <AssessmentIcon className="text-purple-500" style={{ fontSize: 40 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Assessment Participation Rate */}
        <Grid item xs={12} sm={6} md={3} component="div">
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Assessment Completion
                  </Typography>
                  <Typography variant="h4">
                    {completionRate?.toFixed(1) || 0}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {completedAssessments} of {totalAssessments}
                  </Typography>
                </div>
                <TrendingUp className="text-orange-500" style={{ fontSize: 40 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" className="text-gray-600 mt-6">Risk Distribution</Typography>
      <Grid container spacing={2} component="div">
        {Object.entries(riskDistribution).map(([risk, count]) => (
          <Grid item xs={6} sm={3} key={risk} component="div">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
                    </Typography>
                    <Typography variant="h4">
                      {typeof count === 'number' ? count : 0}
                    </Typography>
                  </div>
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        risk === 'low' ? 'bg-green-100 text-green-600' :
                        risk === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                        risk === 'high' ? 'bg-orange-100 text-orange-600' :
                        'bg-red-100 text-red-600'
                      }`}
                  >
                    {risk === 'low' ? 'L' : risk === 'moderate' ? 'M' : risk === 'high' ? 'H' : 'S'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
