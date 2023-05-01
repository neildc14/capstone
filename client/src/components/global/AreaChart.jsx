import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
export default function Graph({ data }) {
  // group data by date and status
  const dataGrouped = data?.reduce((acc, curr) => {
    const date = curr.createdAt?.slice(0, 10); // extract date from createdAt string
    const status = curr.status;
    const index = acc?.findIndex(
      (item) => item.date === date && item.status === status
    );
    if (index !== -1) {
      acc[index].count++;
    } else {
      acc.push({ date, status, count: 1 });
    }
    return acc;
  }, []);

  // transform data to match the shape expected by AreaChart
  const chartData = Array.from(
    new Set(dataGrouped.map((item) => item.date))
  ).map((date) => {
    const item = { date };
    dataGrouped
      .filter((d) => d.date === date)
      .forEach((d) => (item[d.status] = d.count));
    return item;
  });

  // define gradient colors
  const uvColor = "#8884d8";
  const pvColor = "#82ca9d";
  const rejectedColor = "#FF4136";

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

      <XAxis dataKey="date" />

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
