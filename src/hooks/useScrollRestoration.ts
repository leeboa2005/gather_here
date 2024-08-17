// useScrollRestoration.ts
import { useEffect, useRef } from 'react';

function useScrollRestoration(postsPerPage: number, tabName: string) {
    const isRestoredRef = useRef(false);

    const restoreScrollPosition = async (loadMorePosts: () => Promise<void>) => {
        console.log('스크롤 복원 함수 호출됨');

        if (isRestoredRef.current) {
            console.log('스크롤 복원이 이미 수행됨, 종료');
            return;
        }

        const savedScrollData = sessionStorage.getItem(`scrollPosition_${tabName}`);
        console.log('복원할 스크롤 위치 데이터:', savedScrollData);

        if (savedScrollData) {
            const { scrollY, targetPostIndex } = JSON.parse(savedScrollData);
            const targetPage = Math.floor(targetPostIndex / postsPerPage) + 1;

            // 목표 페이지까지 데이터 로드
            for (let i = 1; i < targetPage; i++) {
                await loadMorePosts();  // 추가 데이터를 로드하는 함수 호출
            }

            // 데이터가 로드되면 스크롤 복원
            setTimeout(() => {
                window.scrollTo(0, scrollY);
                isRestoredRef.current = true;
                console.log('스크롤 복원 완료됨');
                console.log('실제 복원된 위치:', window.scrollY);
            }, 500);
        } else {
            console.log('세션 스토리지에서 스크롤 위치를 찾을 수 없음');
        }
    };

    const saveScrollPosition = (postId: string | number, postIndex: number) => {
        const scrollData = {
            scrollY: window.scrollY,
            targetPostIndex: postIndex,
        };
        sessionStorage.setItem(`scrollPosition_${tabName}`, JSON.stringify(scrollData));
        console.log('스크롤 위치 저장됨:', scrollData);
    };

    return { saveScrollPosition, restoreScrollPosition };
}

export default useScrollRestoration;