import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import React from "react";
import { TimelineEvent } from "../../../../../utils/interfaces";
import { useUserStore } from "../../../../../utils/zustand/Store";

const parseTimeline = (data: any) => {
  const timelineMap = new Map<string, TimelineEvent[]>();

  data?.forEach((event: TimelineEvent) => {
    const { day, month, year } = event.time;
    const key = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    if (!timelineMap.has(key)) {
      timelineMap.set(key, []);
    }
    timelineMap.get(key)?.push(event);
  });

  return timelineMap;
};

const TimetableCalendar: React.FC = () => {
  const { user } = useUserStore();
  const timelineMap = parseTimeline(user?.timetable);
  const dateCellRender = (value: Dayjs) => {
    const key = value.format("YYYY-MM-DD");
    const listData = timelineMap.get(key) || [];

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default TimetableCalendar;
