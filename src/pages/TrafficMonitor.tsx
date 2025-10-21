import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Activity, Camera, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TrafficData {
  location: string;
  status: "clear" | "moderate" | "congested";
  vehicles: number;
  avgSpeed: number;
  incidents: number;
}

const TrafficMonitor = () => {
  const navigate = useNavigate();
  const [trafficData, setTrafficData] = useState<TrafficData[]>([
    { location: "Highway 101 North", status: "clear", vehicles: 45, avgSpeed: 65, incidents: 0 },
    { location: "Main Street Downtown", status: "moderate", vehicles: 128, avgSpeed: 35, incidents: 1 },
    { location: "I-95 Southbound", status: "congested", vehicles: 242, avgSpeed: 18, incidents: 3 },
    { location: "Park Avenue", status: "clear", vehicles: 34, avgSpeed: 40, incidents: 0 },
    { location: "Central Expressway", status: "moderate", vehicles: 167, avgSpeed: 28, incidents: 2 },
  ]);

  const [activeCameras, setActiveCameras] = useState(15);
  const [totalIncidents, setTotalIncidents] = useState(6);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => prev.map(location => ({
        ...location,
        vehicles: Math.max(20, location.vehicles + Math.floor(Math.random() * 20 - 10)),
        avgSpeed: Math.max(10, Math.min(70, location.avgSpeed + Math.floor(Math.random() * 10 - 5))),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clear":
        return "text-traffic-success";
      case "moderate":
        return "text-traffic-warning";
      case "congested":
        return "text-traffic-alert";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "clear":
        return <CheckCircle className="w-5 h-5" />;
      case "moderate":
        return <Activity className="w-5 h-5" />;
      case "congested":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "clear":
        return "bg-traffic-success/10";
      case "moderate":
        return "bg-traffic-warning/10";
      case "congested":
        return "bg-traffic-alert/10";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Traffic Monitor</h1>
              <p className="text-muted-foreground">Real-time AI-powered surveillance system</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-traffic-success/10 text-traffic-success">
              <div className="w-2 h-2 rounded-full bg-traffic-success animate-pulse" />
              <span className="font-semibold">Live</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card shadow-card border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <Camera className="w-10 h-10 text-primary" />
              <TrendingUp className="w-5 h-5 text-traffic-success" />
            </div>
            <div className="text-3xl font-bold mb-1">{activeCameras}</div>
            <div className="text-sm text-muted-foreground">Active Cameras</div>
          </Card>

          <Card className="gradient-card shadow-card border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-10 h-10 text-traffic-warning" />
              <TrendingUp className="w-5 h-5 text-traffic-success" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {trafficData.reduce((sum, loc) => sum + loc.vehicles, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Vehicles</div>
          </Card>

          <Card className="gradient-card shadow-card border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-10 h-10 text-traffic-alert" />
              {totalIncidents > 0 && (
                <span className="px-2 py-1 rounded-full bg-traffic-alert/20 text-traffic-alert text-xs font-semibold">
                  Active
                </span>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">{totalIncidents}</div>
            <div className="text-sm text-muted-foreground">Active Incidents</div>
          </Card>
        </div>

        {/* Traffic Locations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Monitored Locations</h2>
          {trafficData.map((location, index) => (
            <Card key={index} className="gradient-card shadow-card border-border/50 p-6 hover:scale-[1.01] transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${getStatusBg(location.status)} ${getStatusColor(location.status)}`}>
                    {getStatusIcon(location.status)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{location.location}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      Status: <span className={`font-semibold ${getStatusColor(location.status)}`}>
                        {location.status}
                      </span>
                    </p>
                  </div>
                </div>
                {location.incidents > 0 && (
                  <div className="px-3 py-1 rounded-full bg-traffic-alert/20 text-traffic-alert text-sm font-semibold">
                    {location.incidents} {location.incidents === 1 ? "Incident" : "Incidents"}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Vehicles Detected</div>
                  <div className="text-2xl font-bold">{location.vehicles}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Average Speed</div>
                  <div className="text-2xl font-bold">{location.avgSpeed} mph</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Traffic Flow</div>
                  <Progress 
                    value={location.status === "clear" ? 90 : location.status === "moderate" ? 50 : 20} 
                    className="h-3 mt-2"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <Card className="gradient-card shadow-card border-border/50 p-6 mt-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            AI Surveillance Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-traffic-warning/10 border border-traffic-warning/20">
              <AlertTriangle className="w-5 h-5 text-traffic-warning mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Moderate congestion detected on Central Expressway</p>
                <p className="text-xs text-muted-foreground mt-1">AI recommends rerouting via Park Avenue for 15% faster travel</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-traffic-alert/10 border border-traffic-alert/20">
              <AlertTriangle className="w-5 h-5 text-traffic-alert mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Multiple incidents on I-95 Southbound causing delays</p>
                <p className="text-xs text-muted-foreground mt-1">Emergency services dispatched, estimated clearance in 25 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-traffic-success/10 border border-traffic-success/20">
              <CheckCircle className="w-5 h-5 text-traffic-success mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Optimal conditions on Highway 101 North and Park Avenue</p>
                <p className="text-xs text-muted-foreground mt-1">Traffic flowing smoothly with average speeds above 60 mph</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrafficMonitor;
