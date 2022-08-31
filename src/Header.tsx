import React, { useState } from "react";
import styled from "styled-components";
import { Box, Modal } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import logo from "./assets/vow_logo-29.svg";
import './App.css';

function Header() {
    return (
        <>
            <Container>
                <img src={logo} className="App-logo" alt="logo" />
                <MenuMain>
                    <MenuItem>
                        <a href="https://vowcurrency.com/" aria-current="page">Vow</a>
                    </MenuItem>
                    <MenuItem>
                        <a href="/signup">Login</a>
                    </MenuItem>
                </MenuMain>
            </Container>
        </>
    )
}

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    align-items: flex-start;
    box-sizing: border-box;
    background: white;
    box-shadow: 0 5px 12px 0 rgb(0 0 0 / 7%);
    padding: 22px 20px 21px 20px;
`

export const MenuMain = styled.div`
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    margin: 0;
    padding-left: 50px;
`
export const MenuItem = styled.li`
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    list-style: none;
    margin: 0;
    padding-left: 50px;
`
export default Header;