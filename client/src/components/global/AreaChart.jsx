import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function Graph({ data }) {
  const dataGrouped = data?.reduce((acc, curr) => {
    const dateObj = new Date(curr.createdAt);
    dateObj.setHours(0, 0, 0, 0);
    const dateStart = dateObj.getTime();
    dateObj.setHours(23, 59, 59, 999);
    const dateEnd = dateObj.getTime();
    const status = curr.status;
    const index = acc?.findIndex(
      (item) =>
        item.dateStart === dateStart &&
        item.dateEnd === dateEnd &&
        item.status === status
    );
    if (index !== -1) {
      acc[index].count++;
    } else {
      acc.push({ dateStart, dateEnd, status, count: 1 });
    }
    return acc;
  }, []);

  const chartData = Array.from(
    new Set(dataGrouped?.map((item) => item.dateStart))
  )?.map((date) => {
    const item = { date };
    dataGrouped
      .filter((d) => d.dateStart === date)
      .forEach((d) => (item[d.status] = d.count));
    return item;
  });

  const uvColor = "#8884d8";
  const pvColor = "#82ca9d";
  const rejectedColor = "#FF4136";

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <AreaChart
      width={1100}
      height={250}
      data={chartData}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={uvColor} stopOpacity={0.8} />
          <stop offset="95%" stopColor={uvColor} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={pvColor} stopOpacity={0.8} />
          <stop offset="95%" stopColor={pvColor} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={rejectedColor} stopOpacity={0.8} />
          <stop offset="95%" stopColor={rejectedColor} stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis
        dataKey="date"
        tickFormatter={(tick) => {
          const date = new Date(tick);
          return `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
        }}
      />

      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="approved"
        stroke={uvColor}
        strokeWidth={2}
        fillOpacity={1}
        fill="url(#colorUv)"
        isAnimationActive={false}
        dot={false}
        connectNulls={true}
      />
      <Area
        type="monotone"
        dataKey="fulfilled"
        stroke={pvColor}
        strokeWidth={2}
        fillOpacity={1}
        fill="url(#colorPv)"
        isAnimationActive={false}
        dot={false}
        connectNulls={true}
      />
      <Area
        type="monotone"
        dataKey="rejected"
        stroke={rejectedColor}
        strokeWidth={2}
        fillOpacity={1}
        fill="url(#colorRejected)"
        isAnimationActive={false}
        dot={false}
        connectNulls={true}
      />
    </AreaChart>
  );
}
