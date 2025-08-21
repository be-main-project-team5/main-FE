export type MainRole = 'fan' | 'idol' | 'manager';

export type GreetingProps = {
  role: MainRole;
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
};

export type CalendarScheduleLayoutProps = {
  calendar: React.ReactNode;
  daily: React.ReactNode;
  gridRatio?: string;
  dailyMinWidth?: number;
};
