
import { Box, Button, Card, IconButton } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        name: 'Food',
        number: 123
    },
    {
        name: 'Music',
        number: 432
    },
    {
        name: 'Movie',
        number: 355
    },
    {
        name: 'News',
        number: 1442
    },
    {
        name: 'Gaming',
        number: 542
    },
    {
        name: 'Sport',
        number: 513
    },
    {
        name: 'Business',
        number: 31
    },
    {
        name: 'Science',
        number: 421
    },
    {
        name: 'Social',
        number: 534
    },
    {
        name: 'Others',
        number: '213'
    }
];

export default function News() {

    return (
        <Box sx={{ height: "80vh", width: "100%" }}>
            <Card
                elevation={5}
                sx={{
                    width: "80%",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: '20px',
                    margin: '0 auto'
                }}
            >
                <h1 style={{ lineHeight: "60px", fontSize: "20px", textAlign: "center" }}>
                    Categories
                </h1>
                {categories
                    .sort((a, b) => b.number - a.number) // sort categories by number in descending order
                    .map((c) => {
                        return (
                            <Link
                                id={`${c.name}-item`}
                                key={c.name}
                                to={`/search/*${c.name.toLowerCase()}`}
                                style={{
                                    margin: "5px",
                                    fontSize: "20px",
                                    lineHeight: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                onMouseOver={() => {
                                    document.getElementById(`${c.name}-item`).style.backgroundColor = "#f1f1f1";
                                }}
                                onMouseOut={() => {
                                    document.getElementById(`${c.name}-item`).style.backgroundColor = "transparent";
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            margin: "0 10px",
                                            fontSize: '20px'
                                        }}
                                    >
                                        # {c.name}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            margin: "5px 10px 0 10px",
                                            fontSize: '15px',
                                            color: "gray",
                                        }}
                                    >
                                        {c.number} buzzes
                                    </Box>
                                </Box>
                            </Link>
                        )
                    })
                }
            </Card>
        </Box>
    );
}
