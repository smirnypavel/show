// import React from "react";
// import styles from "@/styles/components/Stats/StatsPage.module.css";

// import { useAppSelector } from "@/redux/hooks";
// import { getUser } from "@/redux/auth/authSelectors";

// const StatsPage = () => {
//   const user = useAppSelector(getUser);
//   console.log(user);
//   // Функция для вычисления разницы в днях между двумя датами
//   const getDaysOnSite = (createdAtString: any) => {
//     const createdAt = new Date(createdAtString);
//     const today = new Date();
//     const differenceInTime = today.getTime() - createdAt.getTime();
//     const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
//     return differenceInDays;
//   };

//   const daysOnSite = getDaysOnSite(user.createdAt);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}> Ваша статистика</h2>
//       <div className={styles.stats}>
//         <h4 className={styles.statsTitle}>Статистика профіля</h4>
//         <ul>
//           <li className={styles.statsItem}>
//             <p>Днів на Wechirka: {daysOnSite}</p>
//           </li>
//           <li className={styles.statsItem}>
//             <div>
//               <p>Переглядів профілю:</p> <span>24</span>
//               <p>Отсанній:</p> <span>сьогодні</span>
//             </div>
//           </li>
//           <li className={styles.statsItem}>
//             <div>
//               {" "}
//               <p>Статус прфілю: </p> <span>пробний період</span>
//               <p>Закінчюєтьтся через:</p> <span>30 днів</span>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className={styles.stats}>
//         <h4 className={styles.statsTitle}>Статистика запитів</h4>
//         <ul>
//           <li className={styles.statsItem}>
//             <p>Запити по Вашому профілю:</p>
//             <span>5</span>
//           </li>
//           <li className={styles.statsItem}>
//             <p>Підтверджених:</p> <span>2</span>
//           </li>
//           <li className={styles.statsItem}>
//             <p>Відхілиних: </p> <span>2</span>
//           </li>
//           <li className={styles.statsItem}>
//             <p>Необроблених: </p> <span>1</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default StatsPage;
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "@/styles/components/Stats/StatsPage.module.css";

const StatisticsPage = () => {
  const categoryData = [
    { category: "Музиканти", value: 400 },
    { category: "Актори", value: 300 },
    { category: "Художники", value: 200 },
    { category: "Танцюристи", value: 100 },
  ];

  const artistRequestsData = [
    { status: "Прийняті", count: 120 },
    { status: "Відхилені", count: 20 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Статистика запитів артиста</h1>

      <div className={styles.chartContainer}>
        <div className={styles.chartBox}>
          <h2 className={styles.chartTitle}>Запити за категоріями</h2>
          <ResponsiveContainer
            width="100%"
            height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label>
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <h2 className={styles.chartTitle}>Запити артиста</h2>
          <ResponsiveContainer
            width="100%"
            height={300}>
            <BarChart
              data={artistRequestsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
