type TOrdersStatistic = {
  title: string;
  count: number;
};

export const OrdersStatistic = ({ title, count }: TOrdersStatistic) => {
  return (
    <div>
      <p className="text text_type_main-medium">{title}:</p>
      <p className="text text_type_digits-large">{count}</p>
    </div>
  );
};
