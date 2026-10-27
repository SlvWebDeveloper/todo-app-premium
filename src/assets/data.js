import { Calendar, CalendarCheck, CheckCircle2, LayoutDashboard, Search, StarIcon } from 'lucide-react';
import logo from './logo.png';

export const image = {
  logo: logo
};

export const sidebarItems = [
  { name: "Overview", icon: LayoutDashboard, id: "overview" },
  { name: "Today", icon: Calendar, id: "today" },
  { name: "Upcoming", icon: CalendarCheck, id: "upcoming" },
  { name: "Completed", icon: CheckCircle2, id: "completed" },
  { name: "Important", icon: StarIcon, id: "important" },
];

export const filters = [
  { name: "All Tasks", id: "all" },
  { name: "Active", id: "active" },
  { name: "Completed", id: "completed" },
  { name: "Important", id: "important" },
];

export const fakeTasks = [
  {
    id: "1",
    title: "Learn Javascript",
    description: "Study module 2 and 3",
    date: "2026-09-25",
    priority: "medium",
    cardColor: "blue",
    isImportant: false,
    isCompleted: false
  },
  {
    id: "2",
    title: "Learn React",
    description: "Study module 2 and 3",
    date: "2026-09-25",
    priority: "high",
    cardColor: "green",
    isImportant: false,
    isCompleted: false
  },
  {
    id: "3",
    title: "Learn NodeJs",
    description: "Study module 2 and 3",
    date: "2026-09-25",
    priority: "medium",
    cardColor: "yellow",
    isImportant: false,
    isCompleted: false
  },
  {
    id: "4",
    title: "Learn Python",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Sunt inventore, quaerat adipisci sint error quia, odio quos qui repellendus suscipit ipsum facilis, exercitationem eveniet officiis ab! Facere enim voluptatem suscipit",
    date: "2026-08-25",
    priority: "low",
    cardColor: "red",
    isImportant: true,
    isCompleted: true

  },
  {
    id: "5",
    title: "Learn Javascript",
    description: "Study module 2 and 3",
    date: "2026-10-25",
    priority: "medium",
    cardColor: "blue",
    isImportant: false,
    isCompleted: false,
  },
];

export const emptyStates = {
  "no-tasks": {
    icon: CheckCircle2,
    title: "No tasks yet",
    description: "Create your first task to get started with TaskFlow Pro",
    action: true,
  },

  "no-results": {
    icon: Search,
    title: "No tasks found",
    description: "Try adjusting your search or filters",
    action: false,
  },

  completed: {
    icon: CheckCircle2,
    title: "All done!",
    description: "You've completed all your tasks. Great work!",
    action: true,
  },
};