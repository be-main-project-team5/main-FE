import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { Schedule, IdolSchedule } from '@/types/schedule';

type SelectOption = { id: number; label: string };

export function useManagerMainData() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());

  // TODO: 이후 /api/idols/?page=1 로 교체. 지금은 하드코어 모킹
  const idols: SelectOption[] = [
    { id: 201, label: '카리나' },
    { id: 202, label: '윈터' },
    { id: 203, label: '닝닝' },
  ];
  const [currentIdolId, setCurrentIdolId] = useState<number>(idols[0].id);

  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const iso = selectedDate.format('YYYY-MM-DD');

    // TODO: API 연동: GET /schedules/manager/mainboard/?date=iso&idolId=currentIdolId
    const mock: IdolSchedule[] = [
      {
        id: 1,
        title: '뮤직뱅크 리허설',
        startTime: `${iso}T14:00:00`,
        endTime: `${iso}T15:00:00`,
        isPublic: true,
        idol: { id: currentIdolId, name: '선택 아이돌' },
      },
      {
        id: 2,
        title: '뮤직뱅크 사전녹화',
        startTime: `${iso}T16:00:00`,
        endTime: `${iso}T17:00:00`,
        isPublic: true,
        idol: { id: currentIdolId, name: '선택 아이돌' },
      },
      {
        id: 3,
        title: '뮤직뱅크 본방',
        startTime: `${iso}T18:00:00`,
        endTime: `${iso}T19:00:00`,
        isPublic: true,
        idol: { id: currentIdolId, name: '선택 아이돌' },
      },
      {
        id: 4,
        title: '팬사인회',
        startTime: `${iso}T20:00:00`,
        endTime: `${iso}T21:00:00`,
        isPublic: true,
        idol: { id: currentIdolId, name: '선택 아이돌' },
      },
    ];

    setAllSchedules(mock as Schedule[]);
  }, [selectedDate, currentIdolId]);

  const handleAddClick = useCallback(() => {
    alert('일정 등록 모달 오픈'); // TODO: setOpenCreateModal(true)
  }, []);

  const handleEditClick = useCallback((id: number) => {
    alert(`수정 모달 오픈: ${id}`); // TODO: setEditTarget(id); setOpenEditModal(true)
  }, []);

  const handleDeleteClick = useCallback((id: number) => {
    // TODO: 실제 삭제 API 연결 전까지 낙관적 업데이트
    setAllSchedules(prev => prev.filter(s => s.id !== id));
  }, []);

  const filteredSchedules = useMemo(() => allSchedules, [allSchedules]);

  return {
    selectedDate,
    setSelectedDate,
    idols,
    currentIdolId,
    setCurrentIdolId,
    filteredSchedules,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  };
}
