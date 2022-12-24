export function GamePoints() {
    return (
        <>
            {
                Array.from({ length: 15 }).map((_, i) => {
                    return (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    );
                })
            }
        </>
    );
}