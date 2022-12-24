import { FirstTeamCountryCodePropsType } from "./FirstTeamCountryCode";
import { getName } from 'country-list';


export function FirstTeamCountryName({firstTeamCountryCode}: FirstTeamCountryCodePropsType) {
    return (
        <div className="truncate">{getName(firstTeamCountryCode)}</div>
    );
}