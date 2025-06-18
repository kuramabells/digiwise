import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DataVisualizationsProps {
  riskData: {
    low: number;
    moderate: number;
    high: number;
    severe: number;
  };
  recentAssessments: Array<{
    User: {
      firstName: string;
      lastName: string;
      email: string;
    };
    Result: {
      overall_score: number;
      risk_level: string;
    };
  }>;
}

const COLORS = ['#4CAF50', '#FFC107', '#FF9800', '#F44336'];

// Mock data for risk distribution
const mockRiskData = {
  low: 45,
  moderate: 30,
  high: 15,
  severe: 10
};

export const DataVisualizations: React.FC<DataVisualizationsProps> = ({ 
  riskData = mockRiskData, 
  recentAssessments = [] 
}) => {
  const pieData = Object.entries(riskData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  return (
    <div className="space-y-6">
      {/* Risk Distribution Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Risk Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <Typography variant="body2">
                  {entry.name}: {entry.value}%
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assessments */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Assessments
          </Typography>
          <div className="space-y-4">
            {recentAssessments && recentAssessments.length > 0 ? (
              recentAssessments.map((assessment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <Typography variant="subtitle1">
                      {assessment.User?.firstName} {assessment.User?.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {assessment.User?.email}
                    </Typography>
                  </div>
                  <div className="text-right">
                    <Typography variant="subtitle1" color="primary">
                      Score: {assessment.Result?.overall_score || 'N/A'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: COLORS[Object.keys(riskData).indexOf(assessment.Result?.risk_level?.toLowerCase() || '')]
                      }}
                    >
                      {assessment.Result?.risk_level || 'N/A'}
                    </Typography>
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No recent assessments available
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};