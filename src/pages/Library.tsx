
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Activity {
  id: string;
  timestamp: Date;
  type: "search" | "logger" | "settings";
  description: string;
  details?: string;
  success: boolean;
}

const Library = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Generate mock activity data
    const mockActivities: Activity[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: "search",
        description: "Поиск по номеру телефона",
        details: "+7 (999) 123-4567",
        success: true,
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: "logger",
        description: "Создан IP логгер",
        details: "https://example.com",
        success: true,
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        type: "search",
        description: "Поиск по ИНН",
        details: "123456789012",
        success: false,
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        type: "settings",
        description: "Изменение темы приложения",
        success: true,
      },
      {
        id: "5",
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        type: "search",
        description: "Поиск по IP-адресу",
        details: "192.168.1.1",
        success: true,
      },
      {
        id: "6",
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        type: "logger",
        description: "Обнаружен переход по ссылке",
        details: "IP: 203.0.113.1",
        success: true,
      },
    ];

    setActivities(mockActivities);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "search":
        return <Icon name="Search" className="text-blue-400" />;
      case "logger":
        return <Icon name="Zap" className="text-yellow-400" />;
      case "settings":
        return <Icon name="Settings" className="text-purple-400" />;
      default:
        return <Icon name="Activity" className="text-gray-400" />;
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) return `${minutes} мин. назад`;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours} ч. назад`;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} д. назад`;
  };

  const filteredActivities = activities.filter(activity => 
    activeTab === "all" || activity.type === activeTab
  );

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl">Библиотека</CardTitle>
          <CardDescription className="text-center">История всех действий и результатов</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="search">Поиск</TabsTrigger>
              <TabsTrigger value="logger">IP Logger</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="console-output">
                {filteredActivities.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    Нет активности для отображения
                  </div>
                ) : (
                  filteredActivities.map((activity) => (
                    <div key={activity.id} className="log-item flex items-start">
                      <div className="mr-3 mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={activity.success ? "success" : "error"}>
                            {activity.description}
                          </span>
                          <span className="timestamp">{formatRelativeTime(activity.timestamp)}</span>
                        </div>
                        {activity.details && (
                          <div className="text-muted-foreground text-xs mt-1">{activity.details}</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Library;
