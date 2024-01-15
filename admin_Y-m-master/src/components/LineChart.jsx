import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { mockLineData as data } from "../data/mockData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { data } = useSelector((state) => state.dashboardReducer);

    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (data)
            setOrder(() => {
                return [
                    {
                        id: "Đã bán",
                        color: tokens("dark").greenAccent[500],
                        data: data.orderSuccess,
                    },
                    {
                        id: "Chờ xác nhận",
                        color: tokens("dark").blueAccent[300],
                        data: data.orderWait,
                    },
                ];
            });
    }, [data]);

    return (
        <>
            {order && (
                <ResponsiveLine
                    data={[...order, revenue]}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: colors.grey[100],
                                },
                            },
                            legend: {
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: colors.grey[100],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        tooltip: {
                            container: {
                                color: colors.primary[500],
                            },
                        },
                    }}
                    colors={
                        isDashboard ? { datum: "color" } : { scheme: "nivo" }
                    } // added
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 0,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : "transportation", // added
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickValues: 5, // added
                        tickSize: 3,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : "count", // added
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={8}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            )}
        </>
    );
};

export default LineChart;

var revenue = {
    id: "truy cập",
    color: tokens("dark").redAccent[200],
    data: [
        {
            x: "T1",
            y: 2,
        },
        {
            x: "T2",
            y: 6,
        },
        {
            x: "T3",
            y: 11,
        },
        {
            x: "T4",
            y: 90,
        },
        {
            x: "T5",
            y: 32,
        },
        {
            x: "T6",
            y: 11,
        },
        {
            x: "T7",
            y: 23,
        },
        {
            x: "T8",
            y: 8,
        },
        {
            x: "T9",
            y: 6,
        },
        {
            x: "T10",
            y: 11,
        },
        {
            x: "T11",
            y: 35,
        },
        {
            x: "T12",
            y: 14,
        },
    ],
};
