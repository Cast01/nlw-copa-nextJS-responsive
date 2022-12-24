import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { GameCard } from './game-card/GameCard';

interface ItemsPropsType {
    currentItems: {
        id: string,
        firstTeamCountryCode: string,
        secondTeamCountryCode: string,
        date: Date,
        Guess: {
            firstTeamPoints: number,
            secondTeamPoints: number,
        }
    }[],
    roomId: string,
}

interface PaginatedItemsPropsType {
    itemsPerPage: number,
    allGamesInThisRoom: {
        id: string,
        firstTeamCountryCode: string,
        secondTeamCountryCode: string,
        date: Date,
        Guess: {
            firstTeamPoints: number,
            secondTeamPoints: number,
        }
    }[],
    roomId: string,
}

function Items({ currentItems, roomId }: ItemsPropsType) {
    return (
        <>
            {currentItems &&
                currentItems.map(game => (
                    <GameCard key={game.id} game={game} gameId={game.id} roomId={roomId} />
                ))}
        </>
    );
}

export function PaginatedItems({ itemsPerPage, allGamesInThisRoom, roomId }: PaginatedItemsPropsType) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = allGamesInThisRoom.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allGamesInThisRoom.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % allGamesInThisRoom.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div id="Pagination" className='flex flex-col gap-8 items-center'>
            <div className='flex justify-center gap-8'>
                <Items currentItems={currentItems} roomId={roomId} />
            </div>
            <ReactPaginate
                className='flex justify-center gap-6 w-fit'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={undefined}

            />
        </div>
    );
}