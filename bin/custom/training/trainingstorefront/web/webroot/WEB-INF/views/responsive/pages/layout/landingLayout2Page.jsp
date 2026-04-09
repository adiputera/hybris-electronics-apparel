<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="template" tagdir="/WEB-INF/tags/responsive/template"%>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>

<template:page pageTitle="${pageTitle}">
    <cms:pageSlot position="Section1" var="feature">
        <cms:component component="${feature}" />
    </cms:pageSlot>
    <div class="row no-margin">
        <div class="col-xs-12 col-md-6 no-space">
            <div class="lazy-slot-component"
                     data-slot-position="Section2A"
                     data-slot-element="div"
                     data-slot-class="row no-margin"
                     data-component-element="div"
                     data-component-class="col-xs-12 col-sm-6 no-space yComponentWrapper"
                     data-page-id="${currentPage.uid}">
                <div class="lazy-loading-placeholder"></div>
            </div>
            <%-- <cms:pageSlot position="Section2A" var="feature" element="div" class="row no-margin">
                <cms:component component="${feature}" element="div" class="col-xs-12 col-sm-6 no-space yComponentWrapper"/>
            </cms:pageSlot> --%>
        </div>
        <div class="col-xs-12 col-md-6 no-space">
            <div class="lazy-slot-component"
                     data-slot-position="Section2B"
                     data-slot-element="div"
                     data-slot-class="row no-margin"
                     data-component-element="div"
                     data-component-class="col-xs-12 col-sm-6 no-space yComponentWrapper"
                     data-page-id="${currentPage.uid}">
                <div class="lazy-loading-placeholder"></div>
            </div>
            <%-- <cms:pageSlot position="Section2B" var="feature" element="div" class="row no-margin">
                <cms:component component="${feature}" element="div" class="col-xs-12 col-sm-6 no-space yComponentWrapper"/>
            </cms:pageSlot> --%>
        </div>
        <div class="col-xs-12">
            <div class="lazy-slot-component"
                     data-slot-position="Section2C"
                     data-slot-element="div"
                     data-slot-class="landingLayout2PageSection2C"
                     data-component-element="div"
                     data-component-class="yComponentWrapper"
                     data-page-id="${currentPage.uid}">
                <div class="lazy-loading-placeholder"></div>
            </div>
            <%-- <cms:pageSlot position="Section2C" var="feature" element="div" class="landingLayout2PageSection2C">
                <cms:component component="${feature}" element="div" class="yComponentWrapper"/>
            </cms:pageSlot> --%>
        </div>
    </div>

    <div class="lazy-slot-component"
             data-slot-position="Section3"
             data-slot-element="div"
             data-slot-class="row no-margin"
             data-component-element="div"
             data-component-class="no-space yComponentWrapper"
             data-page-id="${currentPage.uid}">
        <div class="lazy-loading-placeholder"></div>
    </div>
    <%-- <cms:pageSlot position="Section3" var="feature" element="div" class="row no-margin" >
        <cms:component component="${feature}" element="div" class="no-space yComponentWrapper"/>
    </cms:pageSlot> --%>

    <div class="lazy-slot-component"
             data-slot-position="Section4"
             data-slot-element="div"
             data-slot-class="row no-margin"
             data-component-element="div"
             data-component-class="col-xs-6 col-md-3 no-space yComponentWrapper"
             data-page-id="${currentPage.uid}">
        <div class="lazy-loading-placeholder"></div>
    </div>
    <%-- <cms:pageSlot position="Section4" var="feature" element="div" class="row no-margin">
        <cms:component component="${feature}" element="div" class="col-xs-6 col-md-3 no-space yComponentWrapper"/>
    </cms:pageSlot> --%>

    <div class="lazy-slot-component"
             data-slot-position="Section5"
             data-slot-element="div"
             data-slot-class=""
             data-component-element="div"
             data-component-class="yComponentWrapper"
             data-page-id="${currentPage.uid}">
        <div class="lazy-loading-placeholder"></div>
    </div>
    <%-- <cms:pageSlot position="Section5" var="feature" element="div">
        <cms:component component="${feature}" element="div" class="yComponentWrapper"/>
    </cms:pageSlot> --%>

</template:page>
