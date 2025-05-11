
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{
    timestamp: string;
    type: "info" | "success" | "error" | "warning";
    message: string;
  }>>([]);
  const [searchType, setSearchType] = useState("phone");

  const handleSearch = () => {
    // Demo functionality - in a real app, this would make a proper API call
    if (!searchQuery.trim()) return;
    
    setSearchResults(prev => [
      {
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: `Поиск информации по запросу: ${searchQuery}`
      },
      ...prev
    ]);
    
    // Simulate search delay
    setTimeout(() => {
      if (Math.random() > 0.3) {
        setSearchResults(prev => [
          {
            timestamp: new Date().toLocaleTimeString(),
            type: "success",
            message: `Найдена информация для ${searchQuery}: ${Math.floor(Math.random() * 1000)} записей`
          },
          ...prev
        ]);
      } else {
        setSearchResults(prev => [
          {
            timestamp: new Date().toLocaleTimeString(),
            type: "error",
            message: `Не удалось найти данные для ${searchQuery}`
          },
          ...prev
        ]);
      }
    }, 1500);
  };

  const searchTypes = [
    { id: "phone", label: "Номер телефона", color: "text-green-400", icon: "Phone" },
    { id: "name", label: "ФИО", color: "text-blue-400", icon: "User" },
    { id: "nickname", label: "Никнейм", color: "text-violet-400", icon: "AtSign" },
    { id: "email", label: "E-mail", color: "text-orange-400", icon: "Mail" },
    { id: "passport", label: "Паспорт", color: "text-red-400", icon: "FileText" },
    { id: "inn", label: "ИНН", color: "text-teal-400", icon: "FileDigit" },
    { id: "snils", label: "СНИЛС", color: "text-blue-400", icon: "Paperclip" },
    { id: "ip", label: "IP", color: "text-pink-400", icon: "Globe" },
  ];

  const getStatusNumbers = () => {
    return [
      { value: searchResults.length, label: "ЗАПИСЕЙ", color: "text-blue-400" },
      { value: Math.floor(Math.random() * 10), label: "БАЗ ДАННЫХ", color: "text-green-400" },
      { value: Math.floor(Math.random() * 20), label: "ИСТОЧНИКОВ", color: "text-yellow-400" },
    ];
  };

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-3xl">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="status-numbers">
            {getStatusNumbers().map((stat, index) => (
              <div className="status-number" key={index}>
                <div className={`value ${stat.color}`}>{stat.value}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {searchTypes.map((type) => (
              <button
                key={type.id}
                className={`search-type-button ${searchType === type.id ? 'active' : ''}`}
                onClick={() => setSearchType(type.id)}
              >
                <span className={`text-lg ${type.color}`}>
                  <Icon name={type.icon} />
                </span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Введите поисковый запрос..."
              className="flex-1 bg-card border-accent/20 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button 
              className="bg-accent hover:bg-accent/90 h-12 px-8"
              onClick={handleSearch}
            >
              НАЙТИ
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Результаты поиска</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="console-output">
            {searchResults.length === 0 ? (
              <div className="text-muted-foreground text-center py-4">
                Здесь будут отображаться результаты поиска
              </div>
            ) : (
              searchResults.map((result, index) => (
                <div key={index} className="log-item">
                  <span className="timestamp">[{result.timestamp}]</span>
                  <span className={result.type}>{result.message}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
