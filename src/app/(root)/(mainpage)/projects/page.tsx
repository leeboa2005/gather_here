import { Tables } from "@/types/supabase";
import Image from "next/image";

type ItEventsRow = Tables<"IT_Events">;

// Promise 가 가져오는 IT_Events Table 의 모든 값
type ItEventsPost = {
  IT_Events: ItEventsRow[];
};

const page = async () => {
  const getEvents: () => Promise<ItEventsPost> = async () => {
    const res = await fetch("http://localhost:3000/api/events", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return data;
  };

  const { IT_Events }: ItEventsPost = await getEvents();

  return (
    <ul>
      test
      {IT_Events.map((IT_Event) => {
        return (
          <li key={IT_Event.event_id}>
            <Image src={IT_Event.img_url} height={150} width={150} alt="배너 이미지" />
            <h4>{IT_Event.title}</h4>
            <p>{IT_Event.category}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default page;
