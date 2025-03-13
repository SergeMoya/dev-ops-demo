import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress, 
  Box, 
  Paper,
  Chip,
  LinearProgress,
  Divider,
  useTheme
} from '@mui/material';
import { 
  Battery90 as BatteryFullIcon,
  Battery60 as BatteryMediumIcon,
  Battery20 as BatteryLowIcon,
  FavoriteBorder as HeartIcon,
  DirectionsWalk as StepsIcon,
  AccessTime as TimeIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { DeviceTelemetry } from '../types';
import axios from 'axios';

const DeviceDashboard: React.FC = () => {
  const [devices, setDevices] = useState<DeviceTelemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DeviceTelemetry[]>('http://localhost:5000/telemetry/all');
        setDevices(response.data);
        setError(null);
        setLastRefresh(new Date());
      } catch (err) {
        setError('Failed to fetch device data');
        console.error('Error fetching device data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getBatteryIcon = (level: number) => {
    if (level > 70) return <BatteryFullIcon style={{ color: '#4caf50' }} />;
    if (level > 30) return <BatteryMediumIcon style={{ color: '#ff9800' }} />;
    return <BatteryLowIcon style={{ color: '#f44336' }} />;
  };

  const getHeartRateColor = (rate: number) => {
    if (rate < 60) return '#2196f3'; // Low - blue
    if (rate < 100) return '#4caf50'; // Normal - green
    if (rate < 140) return '#ff9800'; // Elevated - orange
    return '#f44336'; // High - red
  };

  const getDeviceStatusColor = (batteryLevel: number, lastUpdate: string) => {
    const updateTime = new Date(lastUpdate).getTime();
    const currentTime = new Date().getTime();
    const minutesSinceUpdate = (currentTime - updateTime) / (1000 * 60);
    
    if (batteryLevel < 15 || minutesSinceUpdate > 30) return '#f44336'; // Critical - red
    if (batteryLevel < 30 || minutesSinceUpdate > 15) return '#ff9800'; // Warning - orange
    return '#4caf50'; // Good - green
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" flexDirection="column">
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Loading device data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" flexDirection="column">
        <ErrorIcon color="error" style={{ fontSize: 60 }} />
        <Typography variant="h6" color="error" style={{ marginTop: 16 }}>
          {error}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
          Please check your connection to the device simulator.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="500">
          Device Telemetry Dashboard
        </Typography>
        <Chip 
          icon={<RefreshIcon />} 
          label={`Last updated: ${lastRefresh.toLocaleTimeString()}`} 
          variant="outlined" 
          size="small"
        />
      </Box>
      
      <Grid container spacing={3}>
        {devices.map((device) => {
          const statusColor = getDeviceStatusColor(device.battery_level, device.timestamp);
          return (
            <Grid item xs={12} sm={6} md={4} key={device.device_id}>
              <Card 
                elevation={3} 
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
                  },
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: statusColor,
                    margin: '12px',
                    boxShadow: `0 0 8px ${statusColor}`
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom fontWeight="500">
                    Device {device.device_id}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HeartIcon style={{ color: getHeartRateColor(device.heart_rate), marginRight: 8 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">Heart Rate</Typography>
                        <Typography variant="body1" fontWeight="medium">{device.heart_rate} BPM</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min((device.heart_rate / 200) * 100, 100)} 
                        sx={{ 
                          height: 4, 
                          borderRadius: 2, 
                          mt: 0.5,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getHeartRateColor(device.heart_rate)
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StepsIcon style={{ color: '#2196f3', marginRight: 8 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">Steps</Typography>
                        <Typography variant="body1" fontWeight="medium">{device.steps.toLocaleString()}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min((device.steps / 10000) * 100, 100)} 
                        sx={{ 
                          height: 4, 
                          borderRadius: 2, 
                          mt: 0.5,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#2196f3'
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getBatteryIcon(device.battery_level)}
                    <Box sx={{ flexGrow: 1, ml: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">Battery</Typography>
                        <Typography variant="body1" fontWeight="medium">{device.battery_level}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={device.battery_level} 
                        sx={{ 
                          height: 4, 
                          borderRadius: 2, 
                          mt: 0.5,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: device.battery_level > 70 ? '#4caf50' : 
                                           device.battery_level > 30 ? '#ff9800' : '#f44336'
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, opacity: 0.7 }}>
                    <TimeIcon fontSize="small" sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" color="textSecondary">
                      Last Updated: {new Date(device.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DeviceDashboard;
