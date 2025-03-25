import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Spin } from "antd";
import type { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { TimelineEvent } from "../../../../../utils/interfaces";
import { useUserStore } from "../../../../../utils/zustand/Store";
import { getTimetableInfo } from "../../../../../utils/api";

const parseTimeline = (data: any) => {
  const timelineMap = new Map<string, TimelineEvent[]>();
  console.log(data);
  data?.forEach((event: TimelineEvent) => {
    const date = new Date(event?.timeline?.time);
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString(); // Months are zero-indexed
    const year = date.getFullYear().toString();
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
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState<TimelineEvent[]>(
    user?.timetable || []
  );
  const timelineMap = parseTimeline(timetable);
  const getTimetable = async () => {
    try {
      setLoading(true);
      const resp = await getTimetableInfo(user?._id || "");
      if (resp?.isOk) {
        setTimetable(resp?.timetable);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getTimetable();
    };
  }, [user?.timetable]);
  const dateCellRender = (value: Dayjs) => {
    const key = value.format("YYYY-MM-DD");
    const listData = timelineMap.get(key) || [];
    console.log(listData);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item?.timeline?.content}>
            <Badge
              status={item?.timeline?.type as BadgeProps["status"]}
              text={item?.timeline?.content}
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

  return (
    <Spin spinning={loading}>
      <Calendar className="rounded-lg shadow-md" cellRender={cellRender} />
    </Spin>
  );
};

export default TimetableCalendar;
