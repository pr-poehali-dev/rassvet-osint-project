import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const { logout } = useAuth();

  const stats = {
    searches: 32,
    loggers: 15,
    totalQueries: 47,
    daysActive: 14,
    progress: 65,
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl">Настройки</CardTitle>
          <CardDescription className="text-center">
            Управление настройками приложения и статистика
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="preferences">
                <Icon name="Settings" className="mr-2" size={16} />
                Предпочтения
              </TabsTrigger>
              <TabsTrigger value="statistics">
                <Icon name="BarChart" className="mr-2" size={16} />
                Статистика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preferences" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Темная тема</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить темную тему интерфейса
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о результатах
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="history">Сохранять историю</Label>
                    <p className="text-sm text-muted-foreground">
                      Сохранять историю поисковых запросов
                    </p>
                  </div>
                  <Switch
                    id="history"
                    checked={saveHistory}
                    onCheckedChange={setSaveHistory}
                  />
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  <Icon name="Trash2" className="mr-2" size={16} />
                  Очистить историю
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive"
                >
                  <Icon name="LogOut" className="mr-2" size={16} />
                  Выйти из аккаунта
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="statistics">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-1">
                          {stats.searches}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Поисковых запросов
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-1">
                          {stats.loggers}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          IP логгеров
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Общий прогресс</h4>
                        <span className="text-sm text-muted-foreground">
                          {stats.progress}%
                        </span>
                      </div>
                      <Progress value={stats.progress} className="h-2" />
                      <div className="text-sm text-muted-foreground text-center mt-2">
                        Активных дней: {stats.daysActive}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-medium">Статистика запросов</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Всего запросов:</span>
                        <span className="font-medium">
                          {stats.totalQueries}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Успешных:</span>
                        <span className="font-medium text-green-400">
                          {Math.floor(stats.totalQueries * 0.85)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Неудачных:</span>
                        <span className="font-medium text-red-400">
                          {Math.floor(stats.totalQueries * 0.15)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
