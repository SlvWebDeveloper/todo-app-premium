import { describe, it, expect } from "vitest";
import {
  isToday,
  isOverdue,
  isUpcoming,
  formatDate,
  getDeadlineLabel,
} from "./index";

describe( "Date utilities", () => {
  it( "formats a date correctly", () => {
    expect( formatDate( "2026-10-23" ) ).toBe( "23-10-2026" );
  } );

  it( "returns an empty string for a missing date", () => {
    expect( formatDate( "" ) ).toBe( "" );
  } );

  it( "recognizes a future date as upcoming", () => {
    expect( isUpcoming( "2099-12-31" ) ).toBe( true );
  } );

  it( "recognizes a past date as overdue", () => {
    expect( isOverdue( "2000-01-01" ) ).toBe( true );
  } );

  it( "returns false for a missing date", () => {
    expect( isToday( "" ) ).toBe( false );
    expect( isOverdue( "" ) ).toBe( false );
    expect( isUpcoming( "" ) ).toBe( false );
  } );

  it( "returns null for a missing deadline label", () => {
    expect( getDeadlineLabel( "" ) ).toBe( null );
  } );

  it( "recognizes today correctly", () => {
    const today = new Date();

    const todayString = [
      today.getFullYear(),
      String( today.getMonth() + 1 ).padStart( 2, "0" ),
      String( today.getDate() ).padStart( 2, "0" ),
    ].join( "-" );

    expect( isToday( todayString ) ).toBe( true );
    expect( isOverdue( todayString ) ).toBe( false );
    expect( isUpcoming( todayString ) ).toBe( false );
  } );

  it( "recognizes tomorrow correctly", () => {
    const tomorrow = new Date();
    tomorrow.setDate( tomorrow.getDate() + 1 );

    const tomorrowString = [
      tomorrow.getFullYear(),
      String( tomorrow.getMonth() + 1 ).padStart( 2, "0" ),
      String( tomorrow.getDate() ).padStart( 2, "0" ),
    ].join( "-" );

    expect( isUpcoming( tomorrowString ) ).toBe( true );
    expect( getDeadlineLabel( tomorrowString ) ).toBe( "Tomorrow" );
  } );

  it( "does not assign a deadline label to a distant future date", () => {
    expect( getDeadlineLabel( "2099-12-31" ) ).toBe( null );
  } );
} );