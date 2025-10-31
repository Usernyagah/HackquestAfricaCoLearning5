import { useState, useEffect } from "react";

export const useLearningProgress = () => {
  const [viewedTopics, setViewedTopics] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("viewedTopics");
    if (saved) {
      setViewedTopics(JSON.parse(saved));
    }
  }, []);

  const markTopicAsViewed = (topicId: string) => {
    if (!viewedTopics.includes(topicId)) {
      const updated = [...viewedTopics, topicId];
      setViewedTopics(updated);
      localStorage.setItem("viewedTopics", JSON.stringify(updated));
    }
  };

  const isTopicViewed = (topicId: string) => viewedTopics.includes(topicId);

  const getProgress = (totalTopics: number) => {
    return Math.round((viewedTopics.length / totalTopics) * 100);
  };

  return {
    viewedTopics,
    markTopicAsViewed,
    isTopicViewed,
    getProgress,
  };
};
