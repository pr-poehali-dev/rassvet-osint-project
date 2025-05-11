
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Logger = () => {
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState<Array<{
    timestamp: string;
    type: "info" | "success" | "error" | "warning";
    message: string;
  }>>([]);

  const generateRandomIP = () => {
    return Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 256))
      .join(".");
  };

  const generateRandomUserAgent = () => {
    const browsers = [
      "Chrome/91.0.4472.124",
      "Firefox/89.0",
      "Safari/605.1.15",
      "Edge/91.0.864.59",
      "Opera/76.0.4017.177",
    ];
    const os = [
      "Windows NT 10.0",
      "Macintosh; Intel Mac OS X 10_15_7",
      "X11; Linux x86_64",
      "Android 11",
      "iPhone; CPU iPhone OS 14_6",
    ];
    return `Mozilla/5.0 (${os[Math.floor(Math.random() * os.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) ${
      browsers[Math.floor(Math.random() * browsers.length)]
    }`;
  };

  const handleCreateLogger = () => {
    if (!url.trim()) return;
    
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: `Создание IP логгера для URL: ${url}`,
      },
      ...prev,
    ]);

    // Simulate delay
    setTimeout(() => {
      const success = Math.random() > 0.2;
      
      if (success) {
        const shortUrl = `https://rvst.io/${Math.random().toString(36).substring(2, 8)}`;
        
        setLogs((prev) => [
          {
            timestamp: new Date().toLocaleTimeString(),
            type: "success",
            message: `IP логгер создан. Короткая ссылка: ${shortUrl}`,
          },
          ...prev,
        ]);
        
        // Simulate someone visiting the link
        setTimeout(() => {
          const ip = generateRandomIP();
          const userAgent = generateRandomUserAgent();
          const country = ["Россия", "Украина", "Беларусь", "Казахстан", "США", "Германия"][
            Math.floor(Math.random() * 6)
          ];
          
          setLogs((prev) => [
            {
              timestamp: new Date().toLocaleTimeString(),
              type: "warning",
              message: `Обнаружен переход по ссылке!`,
            },
            {
              timestamp: new Date().toLocaleTimeString(),
              type: "info",
              message: `IP: ${ip} | Страна: ${country}`,
            },
            {
              timestamp: new Date().toLocaleTimeString(),
              type: "info",
              message: `User-Agent: ${userAgent}`,
            },
            ...prev,
          ]);
        }, 3000);
      } else {
        setLogs((prev) => [
          {
            timestamp: new Date().toLocaleTimeString(),
            type: "error",
            message: `Ошибка при создании IP логгера для ${url}`,
          },
          ...prev,
        ]);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-3xl">IP Logger</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center mb-6">
            Создайте короткую ссылку для отслеживания IP-адресов посетителей
          </p>
          
          <div className="flex gap-2">
            <Input
              placeholder="Введите URL для маскировки..."
              className="flex-1 bg-card border-accent/20 h-12"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateLogger()}
            />
            <Button 
              className="bg-accent hover:bg-accent/90 h-12 px-6"
              onClick={handleCreateLogger}
            >
              СОЗДАТЬ
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Логи активности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="console-output">
            {logs.length === 0 ? (
              <div className="text-muted-foreground text-center py-4">
                Здесь будут отображаться логи активности
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                  <span className="timestamp">[{log.timestamp}]</span>
                  <span className={log.type}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logger;
