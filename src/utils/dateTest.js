import {
  isToday,
  isOverdue,
  isUpcoming,
  formatDate,
  getDeadlineLabel,
} from "./index";

const today = new Date();
const todayString = [
  today.getFullYear(),
  String( today.getMonth() + 1 ).padStart( 2, "0" ),
  String( today.getDate() ).padStart( 2, "0" ),
].join( "-" );

const yesterday = new Date( today );
yesterday.setDate( yesterday.getDate() - 1 );

const yesterdayString = [
  yesterday.getFullYear(),
  String( yesterday.getMonth() + 1 ).padStart( 2, "0" ),
  String( yesterday.getDate() ).padStart( 2, "0" ),
].join( "-" );

const tomorrow = new Date( today );
tomorrow.setDate( tomorrow.getDate() + 1 );

const tomorrowString = [
  tomorrow.getFullYear(),
  String( tomorrow.getMonth() + 1 ).padStart( 2, "0" ),
  String( tomorrow.getDate() ).padStart( 2, "0" ),
].join( "-" );

console.assert( isToday( todayString ) === true, "Today dovrebbe essere true" );
console.assert( isOverdue( yesterdayString ) === true, "Yesterday dovrebbe essere overdue" );
console.assert( isUpcoming( tomorrowString ) === true, "Tomorrow dovrebbe essere upcoming" );
console.assert( formatDate( "2026-10-23" ) === "23-10-2026", "FormatDate errato" );
console.assert( getDeadlineLabel( todayString ) === "Today", "Label Today errata" );
console.assert( getDeadlineLabel( tomorrowString ) === "Tomorrow", "Label Tomorrow errata" );

console.log( "Test delle date completati" );